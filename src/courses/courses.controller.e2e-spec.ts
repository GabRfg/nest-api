import 'dotenv/config'
import { Test, TestingModule } from '@nestjs/testing'
import { Body, INestApplication } from '@nestjs/common'
import { Course } from './entities/courses.entity'
import { DataSource, DataSourceOptions } from 'typeorm'
import { Tag } from './entities/tags.entity'
import { CoursesModule } from './courses.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import request from 'supertest'

describe('CoursesController e2e tests', () => {
  let app: INestApplication
  let module: TestingModule 
  let data:any
  let courses: Course[]

const dataSourceOptionsTest: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Course, Tag], 
  synchronize: false,  
};

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        CoursesModule,
        TypeOrmModule.forRootAsync({
          useFactory: async () => {
            return dataSourceOptionsTest
          },
        }),
      ],
    }).compile()
    app = module.createNestApplication()
    await app.init()

    data = {
      name: 'nodejs',
      description: 'NodeJs',
      tags: ['nodejs', 'nestjs']
    }
  });

  beforeEach(async () => {
    const dataSource = await new DataSource(dataSourceOptionsTest).initialize()
    const repository = dataSource.getRepository(Course)
    courses = await repository.find()
    await dataSource.destroy()
  })

  afterAll(async ()=> {
    await module.close()
  })

  describe('POST /courses', () => {
    it('should create a course', async () => {
      const res = await request(app.getHttpServer())
      .post('/courses')
      .send(data)
      .expect(201)
      console.log(res.body)
    expect(res.body.id).toBeDefined()
    expect(res.body.name).toEqual(data.name)
    expect(res.body.description).toEqual(data.description)
    expect(res.body.created_at).toBeDefined()
    expect(res.body.tags[0].name).toEqual(data.tags[0])
    expect(res.body.tags[1].name).toEqual(data.tags[1])
    });
  })
});
