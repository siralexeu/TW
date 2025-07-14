import EventEmitter from '../../utils/EventEmitter'
import { SERVER } from '../../config/global'

class SubscriptionStore {
  constructor() {
    this.emitter = new EventEmitter()
    this.subscriptions = []
    this.totalCount = 0
  }

  async subscribe(state, userId) {
    try {
      const response = await fetch(`${SERVER}/api/subscriptions`, {
        method: 'POST',
        body: JSON.stringify({ userId }),
        headers: {
          'Authorization': `Bearer ${state.currentUser.data.token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw response
      }

      this.emitter.emit('SUBSCRIPTION_UPDATE_SUCCESS')
    } catch (err) {
      this.emitter.emit('SUBSCRIPTION_UPDATE_ERROR', err)
    }
  }

  async unsubscribe(state, subscriptionId) {
    try {
      const response = await fetch(`${SERVER}/api/subscriptions/${subscriptionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${state.currentUser.data.token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw response
      }

      this.emitter.emit('SUBSCRIPTION_UPDATE_SUCCESS')
    } catch (err) {
      this.emitter.emit('SUBSCRIPTION_UPDATE_ERROR', err)
    }
  }

  async getSubscriptions(state, partial, page, pageSize, sortBy, sortOrder) {
    const searchParams = {
      page,
      pageSize,
      sortBy,
      sortOrder,
      ...(partial ? { partial } : {})
    }

  const queryParams = new URLSearchParams(searchParams).toString()
  try {
    const response = await fetch(`${SERVER}/api/subscriptions?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${state.currentUser.data.token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw response
    }

    const { subscriptions, totalCount } = await response.json()
    
    this.subscriptions = subscriptions
    this.totalCount = totalCount

    this.emitter.emit('SUBSCRIPTION_SEARCH_SUCCESS')
  } catch (err) {
    this.emitter.emit('SUBSCRIPTION_SEARCH_ERROR', err)
  }
}

  clearSubscriptions() {
    this.subscriptions = []
    this.totalCount = 0
    this.emitter.emit('SUBSCRIPTION_CLEARED')
  }
}

export default SubscriptionStore