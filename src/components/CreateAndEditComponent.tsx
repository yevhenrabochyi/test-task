import { Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControl, InputLabel, MenuItem, Select, TextField, FormHelperText } from '@mui/material'
import React from 'react'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { CATEGORY_SELECT } from './FiltersComponent'
import { type RequisitionsDataType } from '../api/fetchDataPromise'
import { v4 as uuid } from 'uuid'
import { useAppDispatch } from '../app/hooks'
import { addNewRequisition, editRequisition } from '../app/reducer/requisitionReducer'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

interface Props {
  open: boolean
  handleClose: () => void
  dialogProps: RequisitionsDataType
}

interface editData {
  category: string
  name: string
  text: string
  required: string
}

const schema = yup
  .object({
    category: yup.string().required(),
    name: yup.string().required(),
    text: yup.string().required(),
    required: yup.string().required()
  })
  .required()

const CreateAndEditComponent: React.FC<Props> = ({ open, handleClose, dialogProps }) => {
  const dispatch = useAppDispatch()
  const { control, reset, handleSubmit, formState: { errors } } = useForm({
    values: {
      category: dialogProps.category,
      name: dialogProps.name,
      text: dialogProps.text,
      required: dialogProps.required
    },
    resolver: yupResolver(schema)
  })

  const onClose = (): void => {
    reset()
    handleClose()
  }

  const onSubmit: SubmitHandler<editData> = (data) => {
    if (dialogProps.id === '') {
      const id = uuid()
      dispatch(addNewRequisition({ ...dialogProps, ...data, id }))
    } else {
      dispatch(editRequisition({ ...dialogProps, ...data }))
    }
    onClose()
  }

  return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
                {'Add Requisition'}
            </DialogTitle>
            <DialogContent>
                <div className='w-[32rem]'>
                    <div className='mb-5 mt-4 w-full'>
                        <FormControl fullWidth error={!(errors.category == null)}>
                            <InputLabel id="diolog-category-select-label">{CATEGORY_SELECT.label}</InputLabel>
                            <Controller
                                name="category"
                                control={control}
                                render={({ field }) => (
                                    // @ts-expect-error
                                    <Select
                                        labelId="diolog-category-select-label"
                                        label={CATEGORY_SELECT.label}
                                        {...field}
                                    >
                                        {CATEGORY_SELECT.items.map((items) => <MenuItem key={items.value} value={items.value}>{items.label}</MenuItem>)}
                                    </Select>
                                )}
                            />
                            <FormHelperText>{errors.category?.message}</FormHelperText>
                        </FormControl>
                    </div>
                    <div className='mb-5'>
                        <FormControl fullWidth>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        helperText={errors.name?.message}
                                        error={!(errors.name == null)}
                                        id="diolog-name"
                                        label="Name"
                                        {...field}
                                    />
                                )}
                            />
                        </FormControl>
                    </div>
                    <div className='mb-5'>
                        <FormControl fullWidth>
                            <Controller
                                name="text"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                    multiline
                                    rows={3}
                                        error={!(errors.text == null)}
                                        helperText={errors.text?.message}
                                        id="diolog-text"
                                        label="Text"
                                        {...field}
                                    />
                                )}
                            />
                        </FormControl>
                    </div>
                    <div className='mb-5'>
                        <p className='text-sm mb-2'>Use ### to defive variable.</p>
                        <FormControl fullWidth>
                            <Controller
                                name="required"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                    multiline
                                    rows={3}
                                        error={!(errors.required == null)}
                                        helperText={errors.required?.message}
                                        id="diolog-required"
                                        label="Required"
                                        {...field}
                                    />
                                )}
                            />
                        </FormControl>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <div className='flex p-3'>
                    <Button sx={{ mr: 1 }} autoFocus variant="outlined" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleSubmit(onSubmit)} autoFocus>
                        Save
                    </Button>
                </div>

            </DialogActions>
        </Dialog>
  )
}

export default CreateAndEditComponent
