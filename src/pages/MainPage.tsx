import React, { useEffect, useMemo, useState } from 'react'
import { type FilterData, FiltersComponent } from '../components/FiltersComponent'
import RequisitionComponent from '../components/RequisitionComponent'
import { type RequisitionsDataType, fetchDataPromise } from '../api/fetchDataPromise'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { deleteRequisition, selectRequisitions, setAllRequisitions } from '../app/reducer/requisitionReducer'
import { Button, TablePagination } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CreateAndEditComponent from '../components/CreateAndEditComponent'
import DarkModeComponent from '../components/DarkModeComponent'

const defaultDialogProps = {
  id: '',
  category: '',
  name: '',
  text: '',
  required: '',
  edit: true,
  isDelete: true
}

const defaultFilterProps = {
  kind: '',
  category: '',
  name: ''
}

const MainPage: React.FC = () => {
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [count, setCount] = useState<number>(0)
  const [showAddModal, setShowModal] = useState<boolean>(false)
  const [dialogProps, setDialogProps] = useState<RequisitionsDataType>(defaultDialogProps)
  const [filter, setFilter] = useState(defaultFilterProps)
  const requisitions = useAppSelector(selectRequisitions)
  const dispatch = useAppDispatch()

  const getData = async (): Promise<void> => {
    try {
      const { data } = await fetchDataPromise()
      dispatch(setAllRequisitions(data))
    } catch (error) {
      console.log(error)
    }
  }
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ): void => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleModal = (): void => {
    if (showAddModal) setDialogProps(defaultDialogProps)
    setShowModal(!showAddModal)
  }

  const handleEdit = (data: RequisitionsDataType): void => {
    setDialogProps(data)
    setShowModal(true)
  }

  const handleDelete = (id: string): void => {
    dispatch(deleteRequisition(id))
  }

  const handleChangeFilter = (data: FilterData): void => {
    setFilter(data)
  }

  const filterArray = (array: RequisitionsDataType[]): RequisitionsDataType[] => {
    const newArray = array.filter((elem) => {
      return (elem.category.includes(filter.category) && elem.name.includes(filter.name))
    })
    return newArray
  }

  const requiToRender = useMemo(() => {
    const filteredArray = filterArray(requisitions)
    setCount(filteredArray.length)
    const arrayWithPagination = [...filteredArray].slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    return arrayWithPagination.map((requi) => {
      return (<RequisitionComponent key={requi.id} {...requi} handleEdit={handleEdit} handleDelete={handleDelete}/>)
    })
  }, [requisitions, page, rowsPerPage, filter])

  useEffect(() => {
    getData()
  }, [])

  return (
        <div className="grid grid-flow-row auto-rows-max w-full">
            <DarkModeComponent />
            <FiltersComponent {...filter} handleChangeFilter={handleChangeFilter}/>
            <RequisitionComponent category='Category' name='Name' text='Text' id='default' required=''/>
            {requiToRender}
            <div className='w-20 mt-5'>
            <Button onClick={handleModal} variant="outlined" startIcon={<AddIcon />}>
                Requisition
            </Button>
            </div>
            <div className='flex justify-center'>
            <TablePagination
                component="div"
                count={count}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </div>
            <CreateAndEditComponent open={showAddModal} handleClose={handleModal} dialogProps={dialogProps} />
        </div>

  )
}

export default MainPage
