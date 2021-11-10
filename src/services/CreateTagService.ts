import { getCustomRepository } from 'typeorm'
import { TagsRepositories } from '../repositories/TagRepository'
import { CreateUserService } from './CreateUserService'

interface TagRequestInterface {
    name: string
}

class CreateTagService {
    async execute({ name }: TagRequestInterface) {
        const tagsRepository = getCustomRepository(TagsRepositories)

        if (!name) {
            throw new Error('Name is a mandatory field.')
        }

        const tagAlreadyExists = await tagsRepository.findOne({
            name,
        })

        if (tagAlreadyExists) {
            throw new Error('Duplicate tag.')
        }

        const tag = tagsRepository.create({ name })

        await tagsRepository.save(tag)

        return tag
    }
}

export { CreateTagService }
