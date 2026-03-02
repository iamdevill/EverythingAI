import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Order, CreateOrderRequest, UpdateOrderRequest } from '@/types';

// Use service role key for admin operations to bypass RLS policies
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');

    let query = supabase
      .from('orders')
      .select(`
        *,
        order_items(*),
        payments(*)
      `)
      .order('created_at', { ascending: false });

    if (userId) {
      query = query.eq('user_id', userId);
    }

    if (status) {
      query = query.eq('status', status);
    }

    const { data: orders, error } = await query;

    if (error) {
      console.error('Error fetching orders:', error);
      return NextResponse.json(
        { error: 'Failed to fetch orders' },
        { status: 500 }
      );
    }

    const transformedOrders = orders?.map((order: any) => ({
      id: order.id,
      orderNumber: order.order_number,
      userId: order.user_id,
      email: order.email,
      subtotal: parseFloat(order.subtotal),
      taxAmount: parseFloat(order.tax_amount),
      shippingAmount: parseFloat(order.shipping_amount),
      discountAmount: parseFloat(order.discount_amount),
      total: parseFloat(order.total),
      currency: order.currency,
      status: order.status,
      paymentStatus: order.payment_status,
      paymentMethod: order.payment_method,
      shippingAddress: order.shipping_address,
      billingAddress: order.billing_address,
      customerNote: order.customer_note,
      shippingMethod: order.shipping_method,
      trackingNumber: order.tracking_number,
      estimatedDelivery: order.estimated_delivery ? new Date(order.estimated_delivery) : undefined,
      completedAt: order.completed_at ? new Date(order.completed_at) : undefined,
      cancelledAt: order.cancelled_at ? new Date(order.cancelled_at) : undefined,
      createdAt: new Date(order.created_at),
      updatedAt: new Date(order.updated_at),
      orderItems: order.order_items?.map((item: any) => ({
        id: item.id,
        orderId: item.order_id,
        productId: item.product_id,
        variantId: item.variant_id,
        productName: item.product_name,
        variantName: item.variant_name,
        price: parseFloat(item.price),
        quantity: item.quantity,
        subtotal: parseFloat(item.subtotal),
        createdAt: new Date(item.created_at)
      })) || [],
      payments: order.payments?.map((payment: any) => ({
        id: payment.id,
        orderId: payment.order_id,
        paymentIntentId: payment.payment_intent_id,
        amount: parseFloat(payment.amount),
        currency: payment.currency,
        status: payment.status,
        paymentMethodType: payment.payment_method_type,
        paymentMethodDetails: payment.payment_method_details,
        errorMessage: payment.error_message,
        createdAt: new Date(payment.created_at),
        updatedAt: new Date(payment.updated_at)
      })) || []
    }));

    return NextResponse.json(transformedOrders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateOrderRequest = await request.json();
    const { cartItems, shippingAddress, billingAddress, customerNote, shippingMethod, email } = body;

    // Validate required fields
    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json(
        { error: 'Cart items are required' },
        { status: 400 }
      );
    }

    if (!shippingAddress) {
      return NextResponse.json(
        { error: 'Shipping address is required' },
        { status: 400 }
      );
    }

    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => {
      return sum + (item.quantity * getProductPrice(item.productId));
    }, 0);

    const taxRate = 0.08; // 8% tax rate
    const taxAmount = subtotal * taxRate;
    
    const shippingAmount = subtotal >= 50 ? 0 : 5.00; // Free shipping over $50
    const discountAmount = 0; // Could be calculated based on promotions
    const total = subtotal + taxAmount + shippingAmount - discountAmount;

    // Generate order number
    const orderNumber = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        user_id: null, // Could be set based on auth
        email: email,
        subtotal: subtotal.toString(),
        tax_amount: taxAmount.toString(),
        shipping_amount: shippingAmount.toString(),
        discount_amount: discountAmount.toString(),
        total: total.toString(),
        currency: 'USD',
        status: 'pending',
        payment_status: 'pending',
        shipping_address: shippingAddress,
        billing_address: billingAddress,
        customer_note: customerNote,
        shipping_method: shippingMethod,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      return NextResponse.json(
        { error: 'Failed to create order' },
        { status: 500 }
      );
    }

    // Create order items
    const orderItemsData = cartItems.map(item => ({
      order_id: order.id,
      product_id: item.productId,
      variant_id: item.variantId,
      product_name: getProductName(item.productId),
      variant_name: item.variantId ? getVariantName(item.variantId) : undefined,
      price: getProductPrice(item.productId).toString(),
      quantity: item.quantity,
      subtotal: (item.quantity * getProductPrice(item.productId)).toString(),
      created_at: new Date().toISOString()
    }));

    const { error: orderItemsError } = await supabase
      .from('order_items')
      .insert(orderItemsData);

    if (orderItemsError) {
      console.error('Error creating order items:', orderItemsError);
      return NextResponse.json(
        { error: 'Failed to create order items' },
        { status: 500 }
      );
    }

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body: UpdateOrderRequest = await request.json();
    const { id, status, paymentStatus, trackingNumber, estimatedDelivery } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    const updateData: any = {
      updated_at: new Date().toISOString()
    };

    if (status) updateData.status = status;
    if (paymentStatus) updateData.payment_status = paymentStatus;
    if (trackingNumber !== undefined) updateData.tracking_number = trackingNumber;
    if (estimatedDelivery !== undefined) updateData.estimated_delivery = estimatedDelivery;

    // Handle status-specific updates
    if (status === 'delivered') {
      updateData.completed_at = new Date().toISOString();
    } else if (status === 'cancelled') {
      updateData.cancelled_at = new Date().toISOString();
    }

    const { data: order, error } = await supabase
      .from('orders')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating order:', error);
      return NextResponse.json(
        { error: 'Failed to update order' },
        { status: 500 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    );
  }
}

// Helper functions (would need actual product data fetching)
function getProductPrice(productId: string): number {
  // In a real implementation, fetch the product price from database
  // For now, return a placeholder value
  return 29.99;
}

function getProductName(productId: string): string {
  // In a real implementation, fetch the product name from database
  return 'Product Name';
}

function getVariantName(variantId: string): string {
  // In a real implementation, fetch the variant name from database
  return 'Variant Name';
}