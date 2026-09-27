export const statusLabels = { waiting: 'Waiting', called: 'Vehicle Called', arrived: 'Arrived', at_ramp: 'At Ramp', shipped: 'Shipped', not_delivered: 'Note Delivered' }
export default function StatusBadge({ status }) { return <span className={`status status--${status}`}>{statusLabels[status] || status}</span> }
