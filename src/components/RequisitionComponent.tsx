import { IconButton } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { type RequisitionsDataType } from '../api/fetchDataPromise'

interface Props extends RequisitionsDataType {
  handleDelete?: (id: string) => void
  handleEdit?: (data: RequisitionsDataType) => void
}

const RequisitionComponent: React.FC<Props> = ({ id, category, name, text, handleEdit, handleDelete, edit, isDelete, required }) => {
  const onEdit = (): void => {
    handleEdit && handleEdit({ id, category, name, text, edit, isDelete, required })!
  }

  const onDelete = (): void => {
    handleDelete && handleDelete(id)
  }
  return (
        <div className='grid grid-cols-12 border-b-2'>
            <div className='flex items-center mr-5 col-start-1 col-end-3'>{category}</div>
            <div className='flex items-center col-start-3 col-end-5'>{name}</div>
            <div className='flex items-center justify-between ml-5 col-start-5 col-end-13 grid-cols-12'>
                <div className='flex items-center col-start-1 col-end-10'>{text}</div>
                <div className='flex items-center col-start-10 col-end-13'>
                    {edit && <IconButton aria-label="edit" onClick={onEdit}>
                        <EditIcon />
                    </IconButton>}
                    {isDelete && <IconButton aria-label="delete" onClick={onDelete}>
                        <DeleteIcon />
                    </IconButton>}
                </div>
            </div>
        </div>
  )
}

export default RequisitionComponent
