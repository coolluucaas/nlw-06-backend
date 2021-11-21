import { getCustomRepository } from 'typeorm'
import { TagRepository } from '../repositories/TagRepository'

interface TagRequestInterface {
    name: string
}
class CreateTagService {
    async execute({ name }: TagRequestInterface) {
        const tagRepository = getCustomRepository(TagRepository)

        if (!name) {
            throw new Error('Name is a mandatory field.')
        }

        const tagAlreadyExists = await tagRepository.findOne({
            name,
        })

        if (tagAlreadyExists) {
            throw new Error('Duplicate tag.')
        }

        const tag = tagRepository.create({ name })

        await tagRepository.save(tag)

        return tag
    }
}

export { CreateTagService }
