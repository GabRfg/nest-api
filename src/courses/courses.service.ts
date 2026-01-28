import { Injectable } from '@nestjs/common';
import { Course } from './courses.entity';

@Injectable()
export class CoursesService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'Introduction to NestJS',
      description: 'Learn the basics of NestJS framework.',
      tags: ['nestjs', 'backend', 'typescript']
    },
  ]

  findAll(): Course[] {
    return this.courses;
  }
  
  findOne(id: number) {
    return this.courses.find(course => course.id === id);
  }

  create(createCourseDTO: any) {
    this.courses.push(createCourseDTO);
  }

  update(id: number, updateCourseDTO: any) {
    const existingCourse = this.findOne(id);
    if (existingCourse) {
      const index = this.courses.findIndex(course => course.id === id)
      this.courses[index] = {
        id,
        ...updateCourseDTO,
      }
    }
  } 

  remove(id: number) {
    const index = this.courses.findIndex(course => course.id === id)
    if (index >= 0) {
      this.courses.splice(index, 1);
    }
  }
}
