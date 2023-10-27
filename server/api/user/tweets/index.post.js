import formidable from 'formidable'
import { createTweet } from '~/server/db/tweets'
import { creteMediaFile} from '~/server/db/mediaFiles'
import { tweetTransformer } from '~/server/transformers/tweet'
import { uploadToCloudinary } from '~/server/utils/cloudinary'

export default defineEventHandler(async (event) => {
  const form = formidable({})

  const response = await new Promise((res, rej) => {
    form.parse(event.req, (error, fields, files) => {
      if (error) {
        rej(error)
      }
      res({fields, files})
    })
  })

  const { fields, files } = response 

  const userId = event.context?.auth?.user?.id

  const tweetData = {
    text: Array.isArray(fields.text) ? fields.text[0] : fields.text,
    authorId: userId,
  }

  const replyTo = fields.replyTo

  if (replyTo && replyTo !== null) {
    tweetData.replyTo = replyTo
  }


  const tweet = await createTweet(tweetData)

  const filePromises = Object.keys(files).map(async key => {
    const file = files[key]

    const cloudinaryResource = await uploadToCloudinary(file[0].filepath)

    return creteMediaFile({
      url: cloudinaryResource.secure_url,
      providerPublicId: cloudinaryResource.public_id,
      userId: userId,
      tweetId: tweet.id
    })
  })
   
  await Promise.all(filePromises)

  return {
    tweet: tweetTransformer(tweet)
  }
})