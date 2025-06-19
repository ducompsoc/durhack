import { Badge } from "@durhack/web-components/ui/badge"
import { cva } from "class-variance-authority"
import type * as React from "react"

const cvUploadBadgeVariants = cva("text-xl", {
  variants: {
    uploadedCv: {
      true: "bg-success text-success-foreground",
      false: "bg-orange-600 text-white",
    },
  },
})

const cvUploadText: Map<boolean, string> = new Map([
  [true, "CV Uploaded"],
  [false, "No CV Uploaded"],
])

export function CvUploadBadge({
  uploadedCv,
  className,
  ...props
}: { uploadedCv: boolean } & React.ComponentProps<typeof Badge>): React.ReactNode {
  return (
    <Badge variant="outline" className={cvUploadBadgeVariants({ uploadedCv, className })} {...props}>
      {cvUploadText.get(uploadedCv)}
    </Badge>
  )
}
