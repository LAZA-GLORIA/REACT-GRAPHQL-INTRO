import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { CreateBookInput } from "../inputs/CreateBookInput";
import { UpdateBookInput } from "../inputs/UpdateBookInput";
import { Book, BookModel } from "../models/Book";
import datasource from "../db";

@Resolver()
export class BookResolver {
  @Query(() => [Book])
  async books(): Promise<Book[]> {
    const allbooks = await datasource.getRepository(Book).find();
    return { ...allbooks };
  }

  @Query(() => Book)
  book(@Arg("id") id: string) {
    return Book.findOne({ where: { id } });
  }

  @Mutation(() => Book)
  async createBook(@Arg("data") data: CreateBookInput) {
    const book = Book.insert(data);
    //await book.save();
    return book;
  }

  @Mutation(() => Book)
  async updateBook(@Arg("id") id: string, @Arg("data") data: UpdateBookInput) {
    const book = await Book.findOne({ where: { id } });
    if (!book) throw new Error("Book not found!");
    Object.assign(book, data);
    await book.save();
    return book;
  }

  @Mutation(() => Boolean)
async deleteBook(@Arg("id") id: string) {
  const book = await Book.findOne({ where: { id } });
  if (!book) throw new Error("Book not found!");
  await book.remove();
  return true;
}
}
