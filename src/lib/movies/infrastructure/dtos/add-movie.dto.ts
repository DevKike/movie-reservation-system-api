import { plainToInstance, Transform } from 'class-transformer';
import {
  IAddMovieBody,
  IShowtime,
} from '../../domain/interfaces/entity/movies.entity.interface';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

class ShowtimeDTO implements IShowtime {
  @Transform(({ value }) => {
    if (typeof value === 'string' || typeof value === 'number') {
      return new Date(value);
    }
    if (value instanceof Date) {
      return value;
    }

    return new Date('invalid');
  })
  @IsDate()
  dateTime: Date;

  @IsBoolean()
  isAvailable: boolean;
}

export class AddMovieDTO implements IAddMovieBody {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  genre: string;

  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value) as IShowtime[];

        return parsed.map((item) =>
          plainToInstance(ShowtimeDTO, item, {
            enableImplicitConversion: true,
            excludeExtraneousValues: false,
          }),
        );
      } catch {
        return null;
      }
    }
    return value as IShowtime[];
  })
  @ValidateNested({ each: true })
  @IsArray()
  @ArrayMinSize(1)
  showtimes: IShowtime[];
}
