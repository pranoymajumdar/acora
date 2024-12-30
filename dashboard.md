# Dashboard Routes Documentation

## Authentication Pages

### `/login`

- Main login page
- Email/password login form
- Forgot password link
- Remember me functionality

### `/forgot-password`

- Password recovery page
- Email input for reset link
- Success/error messages

### `/reset-password/:token`

- Password reset form
- New password confirmation
- Token validation

## Main Dashboard

### `/dashboard`

- Main overview/landing page after login
- Quick stats widgets
  - Today's sales
  - New orders
  - Low stock alerts
  - Revenue charts
- Recent activity feed
- Performance metrics

## Products Management

### `/products`

- Product list view
- Search and filters
- Bulk actions
- Stock status indicators
- Quick edit options

### `/products/new`

- Add new product form
- Image upload
- Category selection
- Pricing and inventory
- SEO settings

### `/products/edit/:id`

- Edit existing product
- Update all product fields
- Preview changes
- Save/publish options

### `/products/categories`

- Category management
- Create/edit categories
- Category tree view
- Category-specific settings

## Order Management

### `/orders`

- Order list view
- Status filters
- Search orders
- Bulk actions
- Export options

### `/orders/:id`

- Detailed order view
- Customer information
- Order status updates
- Payment details
- Shipping information
- Invoice generation

### `/orders/returns`

- Return requests
- Process refunds
- Return status tracking
- Return policy management

## Customer Management

### `/customers`

- Customer list view
- Search customers
- Customer segments
- Export options

### `/customers/:id`

- Customer profile
- Order history
- Contact information
- Notes and tags
- Communication history

### `/customers/groups`

- Customer group management
- Loyalty programs
- Special pricing rules
- Group permissions

## Content Management

### `/content/banners`

- Homepage banner management
- Banner scheduling
- Mobile/desktop versions
- Analytics integration

### `/content/pages`

- Static page management
- Page editor
- SEO settings
- Preview functionality

### `/content/blog`

- Blog post management
- Post editor
- Categories and tags
- Publishing schedule

## Marketing Tools

### `/marketing/discounts`

- Discount management
- Create/edit coupons
- Promotion rules
- Usage tracking

### `/marketing/campaigns`

- Email campaign management
- Campaign builder
- Audience targeting
- Performance metrics

### `/marketing/reviews`

- Product review management
- Moderate comments
- Rating analytics
- Customer feedback

## Analytics & Reports

### `/analytics/sales`

- Sales performance
- Revenue metrics
- Product performance
- Conversion rates

### `/analytics/inventory`

- Stock level reports
- Product movement
- Reorder suggestions
- Dead stock analysis

### `/analytics/customers`

- Customer behavior
- Purchase patterns
- Customer lifetime value
- Churn analysis

## Settings

### `/settings/store`

- General store settings
- Store details
- Currency options
- Tax configuration

### `/settings/shipping`

- Shipping methods
- Shipping zones
- Rate calculation
- Carrier integration

### `/settings/payments`

- Payment methods
- Gateway configuration
- Payment rules
- Transaction fees

### `/settings/users`

- Admin user management
- Role permissions
- Access control
- Activity logs

### `/settings/notifications`

- Email templates
- Notification rules
- SMS settings
- Alert preferences

## Profile & Account

### `/profile`

- Personal profile
- Account settings
- Password change
- 2FA setup

### `/notifications`

- System notifications
- Order alerts
- Low stock warnings
- Customer messages

## Support Tools

### `/support/help`

- Documentation
- Video tutorials
- FAQs
- Contact support

### `/support/system-status`

- System health
- Error logs
- Performance metrics
- Maintenance tools
