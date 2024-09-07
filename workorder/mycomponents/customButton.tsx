import { ReloadIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import { useFormStatus } from "react-dom"

export function SubmitButton() {
    const status = useFormStatus()
  return (<>
    {status.pending ? <Button type="submit" disabled>
      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button> : <Button type="submit">Submit Asset</Button>}
    </>
  )
}
