import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module"
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";


async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule)

    const config = new DocumentBuilder()
      .setTitle('English Easy')
      .setDescription('English Easy REST API documentation')
      .setVersion('1.0.0')
      .addTag('English Easy')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    await app.listen(PORT, () => console.log(`server started on port ${PORT}`))
}
start()