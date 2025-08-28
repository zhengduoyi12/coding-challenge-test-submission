import reducer, {
    addAddress,
    removeAddress,
    updateAddresses,
    selectAddress,
  } from './addressBookSlice'
  import type { Address } from '@/types'
  
  // helper: create a fake Address object
  const makeAddress = (overrides: Partial<Address> = {}): Address => ({
    id: overrides.id ?? 'id-1',
    firstName: overrides.firstName ?? ' Alex ',
    lastName: overrides.lastName ?? ' Zheng ',
    street: overrides.street ?? 'George St',
    houseNumber: overrides.houseNumber ?? '10',
    postcode: overrides.postcode ?? '2000',
    city: overrides.city ?? 'Sydney',
  })
  
  // initial state for the slice
  const initialState = { addresses: [] as Address[] }
  
  describe('addressBookSlice reducer', () => {
    it('should add a new address and trim names', () => {
      const a = makeAddress()
      const state = reducer(initialState, addAddress(a))
  
      // expect one address added
      expect(state.addresses).toHaveLength(1)
      // expect names trimmed
      expect(state.addresses[0].firstName).toBe('Alex')
      expect(state.addresses[0].lastName).toBe('Zheng')
    })
  
    it('should not add a duplicate address with the same id', () => {
      const a = makeAddress({ id: 'dup' })
      const s1 = reducer(initialState, addAddress(a))
      const s2 = reducer(s1, addAddress(a)) // try to add same id again
  
      // still only one address
      expect(s2.addresses).toHaveLength(1)
    })
  
    it('should remove an address by id', () => {
      const a1 = makeAddress({ id: 'a1' })
      const a2 = makeAddress({ id: 'a2' })
      const s1 = reducer(initialState, addAddress(a1))
      const s2 = reducer(s1, addAddress(a2))
      const s3 = reducer(s2, removeAddress('a1'))
  
      // only id a2 should remain
      expect(s3.addresses.map(a => a.id)).toEqual(['a2'])
    })
  
    it('should update the entire address list', () => {
      const a1 = makeAddress({ id: 'x1' })
      const a2 = makeAddress({ id: 'x2' })
      const state = reducer(initialState, updateAddresses([a1, a2]))
  
      // expect both addresses present
      expect(state.addresses).toHaveLength(2)
      expect(state.addresses[0].id).toBe('x1')
    })
  
    it('should return addresses using the selector', () => {
      const fakeRootState = {
        addressBook: {
          addresses: [makeAddress({ id: 's1' })],
        },
      } as any
  
      const result = selectAddress(fakeRootState)
  
      // expect one address returned by selector
      expect(result).toHaveLength(1)
      expect(result[0].id).toBe('s1')
    })
  })
  