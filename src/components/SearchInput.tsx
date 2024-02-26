import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

interface SearchInputProps {
  searchKey: string
  page: number
}

interface Form {
  search_key: string
}
const SearchInput = ({ searchKey, page }: SearchInputProps) => {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<Form>({
    defaultValues: {
      search_key: searchKey
    }
  })

  const handleSearch = handleSubmit((data) => {
    router.push(`/search?page=${page}&search_key=${data.search_key}`)
  })

  return <form className="w-1/2 mx-auto my-3" onSubmit={handleSearch}>
        <input type="text" className="border border-slate-300 w-full pl-3 py-2 text-black" {...register('search_key', {
          required: true
        })}
           placeholder="Enter name, category to search ..."/>
        {errors.search_key && (<div className="text-red-500">Search key is required</div>)}
    </form>
}

export default SearchInput
