import { BaseModel } from "./BaseModel.mjs";
import { subscriptions as schema } from '../schemas/subscriptions.mjs';

export const subscriptions = new BaseModel('subscriptions', schema);