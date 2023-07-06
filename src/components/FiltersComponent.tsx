import { FormControl, InputLabel, Select, MenuItem, TextField, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import ClearIcon from '@mui/icons-material/Clear'

const KIND_SELECT = {
  label: 'Kind',
  value: 'Requision on Purchase File',
  items: [{ value: 'Requision on Purchase File', label: 'Requision on Purchase File' }]
}

export const CATEGORY_SELECT = {
  label: 'Category',
  value: '',
  items: [
    { value: 'Accounting', label: 'Accounting' },
    { value: 'Bimba Raketa', label: 'Bimba Raketa' },
    { value: 'Custom', label: 'Custom' }
  ]
}

export interface FilterData {
  kind: string
  category: string
  name: string
}
interface FilterProps extends FilterData {
  handleChangeFilter: (data: FilterData) => void
}

export const FiltersComponent: React.FC<FilterProps> = ({ kind, category, name, handleChangeFilter }) => {
  const [score, setScore] = useState<boolean>(false)
  const { control, handleSubmit, watch } = useForm({
    values: {
      kind: KIND_SELECT.value,
      category,
      name
    }
  })
  const categoryValue = watch('category')

  const onSubmit = (data: FilterData): void => {
    handleChangeFilter(data)
  }

  useEffect(() => {
    categoryValue !== '' ? setScore(true) : setScore(false)
    handleChangeFilter({ kind, name, category: categoryValue })
  }, [categoryValue])

  const handleClear = (): void => {
    handleChangeFilter({ kind, name, category: '' })
  }

  return (
        <form onChange={handleSubmit(onSubmit)} >
            <div className='grid grid-cols-12 mb-5'>
                <div className='mr-5 col-start-1 col-end-4'>
                <FormControl fullWidth>
                    <InputLabel id="demo-kind-select-label">{KIND_SELECT.label}</InputLabel>
                    <Controller
                        name="kind"
                        control={control}
                        render={({ field }) => (
                            // @ts-expect-error
                            <Select
                                disabled
                                labelId="demo-kind-select-label"
                                label={KIND_SELECT.label}
                                {...field}
                            >
                                {KIND_SELECT.items.map((items) => <MenuItem key={items.label} value={items.value}>{items.label}</MenuItem>)}
                            </Select>
                        )}
                    />
                </FormControl>
                </div>

                <div className='col-start-4 col-end-7'>
                <FormControl fullWidth>
                    <InputLabel id="demo-category-select-label">{CATEGORY_SELECT.label}</InputLabel>
                    <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                            // @ts-expect-error
                            <Select
                                labelId="demo-category-select-label"
                                label={CATEGORY_SELECT.label}
                                {...field}
                                endAdornment={<IconButton sx={{ visibility: score ? 'visible' : 'hidden' }} onClick={handleClear}><ClearIcon/></IconButton>}
                            >
                                {CATEGORY_SELECT.items.map((items) => <MenuItem key={items.label} value={items.value}>{items.label}</MenuItem>)}
                            </Select>
                        )}
                    />
                </FormControl>
                </div>
                <div className='ml-5 col-start-7 col-end-13'>
                <FormControl fullWidth className='mx-2'>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                id="demo-name"
                                label="Name"
                                {...field}
                            />
                        )}
                    />
                </FormControl>
                </div>
            </div>
        </form>
  )
}
