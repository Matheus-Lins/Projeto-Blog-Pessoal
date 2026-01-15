import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository, DeleteResult } from 'typeorm';
import { Postagem } from '../entities/postagem.entity';

@Injectable()
export class PostagemService {
  constructor(
    @InjectRepository(Postagem)
    private postagemRepository: Repository<Postagem>,
  ) {}

  async findAll(): Promise<Postagem[]> {
    return await this.postagemRepository.find();
  }

  //get por ID22222222222222222222222222222222222222222222222222222222222222
  async findById(id: number): Promise<Postagem> {
    const postagem = await this.postagemRepository.findOne({
      where: {
        id,
      },
    });

    if (!postagem)
      throw new HttpException('Postagem nao encontrada!', HttpStatus.NOT_FOUND);

    return postagem;
  }

  //get por Título
  async findAllByTitulo(titulo: string): Promise<Postagem[]> {
    return await this.postagemRepository.find({
      where: {
        titulo: ILike(`%${titulo}%`),
      },
    });
  }

  //post
  async create(postagem: Postagem): Promise<Postagem> {
    return await this.postagemRepository.save(postagem);
  }

  //update
  async update(postagem: Postagem): Promise<Postagem> {
    await this.findById(postagem.id);

    return await this.postagemRepository.save(postagem);
  }

  //delete
  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.postagemRepository.delete(id);
  }
}
