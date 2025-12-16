import { createParamDecorator } from "@nestjs/common";
import { ExecutionContext } from "@nestjs/common";
import type { User} from '@prisma/client'


const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) =>{
    const request =ctx.switchToHttp().getRequest()
    const user = request.user as User;
    if(data){
        return user[data as keyof User]
    }
    return user;
    }
)
  
export default User;



// @User().  ---> data:undefined,
// @User('email').  ---> data:'email'

