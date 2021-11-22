import { BaseModel } from "./BaseModel.mjs";
import { movies as schema } from '../schemas/movies.mjs'

export const movies = new BaseModel('movies', schema);