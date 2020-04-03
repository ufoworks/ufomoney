import { format } from 'date-fns'
export function mapFilters (filters) {
  const result = {}
  if (!filters) {
    return result
  }
  if (filters.date) {
    result.date_gte = format(filters.date.start, 'yyyy-MM-dd')
    result.date_lte = format(filters.date.end, 'yyyy-MM-dd')
  }
  if (filters.client) {
    result.client = filters.client
  }
  if (filters.status !== '') {
    result.status = filters.status
  }
  return result
}
