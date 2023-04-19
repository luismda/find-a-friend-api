import { FastifyReply, FastifyRequest, FastifyError } from 'fastify'

type Image = {
  filename: string
  mimetype: string
  buffer: Buffer
}

type Body = {
  [key: string]: unknown | Image[]
}

export async function validateAndFormatImagesToUpload(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const parts = request.parts({
      limits: {
        fileSize: 1024 * 1024, // 1 MB in bytes
      },
    })

    const images: Image[] = []
    const body: Body = {}

    for await (const part of parts) {
      if (part.type === 'file') {
        const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png']

        const isImageWithAllowedType = allowedImageTypes.includes(part.mimetype)

        if (!isImageWithAllowedType) {
          return reply.status(415).send({
            message: `The image type ${part.mimetype} is not supported.`,
          })
        }

        const buffer = await part.toBuffer()

        const image: Image = {
          filename: part.filename,
          mimetype: part.mimetype,
          buffer,
        }

        images.push(image)
      } else {
        const { fieldname, value } = part

        try {
          body[fieldname] = JSON.parse(String(value))
        } catch (error) {
          body[fieldname] = value
        }
      }
    }

    body.images = images
    request.body = body
  } catch (error) {
    const uploadError = error as FastifyError

    if (uploadError.code === 'FST_REQ_FILE_TOO_LARGE') {
      return reply.status(413).send({ message: 'Request file too large.' })
    }

    throw error
  }
}
