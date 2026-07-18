import { ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { User } from "../generated/prisma/client.js";

export class JwtRefreshGuard extends AuthGuard('refresh_jwt'){}
