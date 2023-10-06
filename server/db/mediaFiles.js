import { prisma } from '.'

export const creteMediaFile = (mediaFile) => {
  return prisma.mediaFile.create({
    data: mediaFile
  })
}