import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthDto } from '../src/auth/dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    const PORT = 3021;
    await app.listen(PORT);

    // clean the database before running the tests
    prisma = app.get(PrismaService);
    await prisma.cleanDb();

    pactum.request.setBaseUrl(`http://localhost:${PORT}`);
  });

  afterAll(() => app.close());

  describe('Auth', () => {
    const dto: AuthDto = { email: 'iva@mail.com', password: '12345' };

    describe('Signup', () => {
      it('should not sign up with missign email with status 400', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ password: dto.password })
          .expectStatus(400);
      });

      it('should sign up with status 201', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
        //.inspect(); inspect is useful for debugging
      });
    });

    describe('Signin', () => {
      it('should sign in with status 200', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userToken', 'token');
      });

      it('should not sign in if missing request body with status 400', () => {
        return pactum.spec().post('/auth/signin').expectStatus(400);
      });
    });
  });

  describe('User', () => {
    describe('Get me', () => {
      it('should get the the user status 200', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({ Authorization: 'Bearer $S{userToken}' })
          .expectStatus(200);
      });
    });
  });

  // describe('Bookmark', () => {});
});
