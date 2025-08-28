import { renderHook, act } from '@testing-library/react'
import useFormFields from '@/hooks/useFormFields'

// Define the shape of the form values
type FormShape = {
  firstName: string
  lastName: string
}

describe('useFormFields (text-only)', () => {
  const initial: FormShape = {
    firstName: '',
    lastName: '',
  }

  it('initializes with provided initialValues', () => {
    const { result } = renderHook(() => useFormFields<FormShape>(initial))
    expect(result.current.values).toEqual(initial)
  })

  it('handleChange updates text inputs by name', () => {
    const { result } = renderHook(() => useFormFields<FormShape>(initial))

    const evt = {
      target: { name: 'firstName', value: 'Alex' },
    } as any

    act(() => {
      result.current.handleChange(evt)
    })

    expect(result.current.values.firstName).toBe('Alex')
    expect(result.current.values.lastName).toBe('')
  })

  it('setField updates a specific field', () => {
    const { result } = renderHook(() => useFormFields<FormShape>(initial))

    act(() => {
      result.current.setField('lastName', 'Zheng')
    })

    expect(result.current.values.lastName).toBe('Zheng')
  })

  it('reset restores initialValues', () => {
    const { result } = renderHook(() => useFormFields<FormShape>(initial))

    act(() => {
      result.current.setField('firstName', 'Alex')
      result.current.setField('lastName', 'Zheng')
    })

    expect(result.current.values).toEqual({
      firstName: 'Alex',
      lastName: 'Zheng',
    })

    act(() => {
      result.current.reset()
    })

    expect(result.current.values).toEqual(initial)
  })

  it('setValues replaces the entire form state', () => {
    const { result } = renderHook(() => useFormFields<FormShape>(initial))

    act(() => {
      result.current.setValues({
        firstName: 'John',
        lastName: 'Doe',
      })
    })

    expect(result.current.values).toEqual({
      firstName: 'John',
      lastName: 'Doe',
    })
  })
})
