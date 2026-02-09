import { randomUUID } from 'node:crypto';
import { CoursesService } from './courses.service';
import { CreateCourseDTO } from './dto/create-course-dto';
import { UpdateCourseDTO } from './dto/update-course-dto';

describe('CoursesService', () => {
  let service: CoursesService;
  let id: string 
  let created_at: Date 
  let expectOutputTags: any 
  let expectOutputCourses: any
  let mockCourseRepository: any
  let mockTagRepository: any

  beforeEach(async () => {
    service = new CoursesService()
    id = randomUUID()
    created_at = new Date()
    expectOutputTags = [
      {
        id,
        name: 'nestjs',
        created_at
      },
    ]
    expectOutputCourses = {
      id, 
      name: 'test',
      description: 'teste description',
      created_at,
      tags: expectOutputTags
    }

    mockCourseRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      update: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      preload: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      findAll: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      find: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      remove: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses))
    }

    mockTagRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
      findOne: jest.fn()
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //the exception bellow is only for testing purpose (service)
  it('should create a course', async () => {
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository
     //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository
    
    const createCourseDTO: CreateCourseDTO = {
      name: 'test',
      description: 'teste description',
      tags: ['nestjs'],
    }

    const newCourse = await service.create(createCourseDTO)

    expect(mockCourseRepository.save).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(newCourse)
  })

  //findAll
    it('should gets all course', async () => {
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository
     //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository

    const courses = await service.findAll()

    expect(mockCourseRepository.find).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(courses)
  })

    //findOne
    it('should get one course', async () => {
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository
     //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository

    const course = await service.findOne(id)

    expect(mockCourseRepository.findOne).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(course)
  })

    //Update 
    it('should update a course', async () => {
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository
     //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository

    const updateCourseDTO: UpdateCourseDTO = {
      name: 'tenest-jest',
      description: 'teste update descriptions',
      tags: ['jestJs'],
    }

    const course = await service.update(id,  UpdateCourseDTO)

    expect(mockCourseRepository.save).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(course)
  })

    //Remove 
    it('should remove a course', async () => {
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository
     //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository

    const updateCourseDTO: UpdateCourseDTO = {
      name: 'remove-jest',
      description: 'teste remove descriptions',
      tags: ['jest-remove'],
    }

    const course = await service.remove(id)

    expect(mockCourseRepository.remove).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(course)
  })
})
