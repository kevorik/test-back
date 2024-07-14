import { Transform } from "class-transformer";
import { IsArray, IsOptional, IsString } from "class-validator";

export class FindOneSubjectQuery {
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @Transform((property) => {
        if (property.value) {
            if (!Array.isArray(property.value)) {
                return [property.value];
            }

            return property.value;
        }
    })
    fields?: string[];
}
