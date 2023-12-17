'use client'

import { useRouter } from 'next/navigation'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '../../../components/ui/alert-dialog'
import { Button } from '../../../components/ui/button'
import useFetch from 'http-react'

interface Props {
  postId: string
}

const PostDeleteButton = ({ postId }: Props) => {
  const router = useRouter()

  const { reFetch: handleDelete } = useFetch('/posts/[postId]', {
    method: 'DELETE',
    id: {
      postId
    },
    auto: false,
    params: {
      postId
    },
    onResolve() {
      router.replace('/posts')
      router.refresh()
    },
    onError(err) {
      console.log(err)
    }
  })

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className='w-80 lg:w-full' size='sm' variant='outline'>
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your psot
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
export default PostDeleteButton
