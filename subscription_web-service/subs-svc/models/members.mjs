import { BaseModel } from "./BaseModel.mjs";
import { members as schema } from '../schemas/members.mjs'

export const members = new BaseModel('members', schema);