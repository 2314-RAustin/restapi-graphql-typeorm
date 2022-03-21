import { Query, Resolver, Mutation, Arg, Field, InputType, Int } from 'type-graphql';
import { Product } from '../entity/Product';
import { connection } from '../config/typeorm';

@InputType()
class ProductInput {
    @Field()
        name!: string;
    
    @Field()
        quantity!: number;
}

@InputType()
class ProductUpdateInput {
    @Field(() => String, { nullable: true })
        name?: string;
    
    @Field(() => Int, { nullable: true })
        quantity?: number;
}

@Resolver()
export class ProductResolver {

    @Mutation(() => Product)
    async createProduct(
        @Arg('variables', () => ProductInput) variables: ProductInput
    ){
        return await connection.manager.save(Product, variables);
    }

    @Mutation(() => Boolean)
    async deleteProduct(
        @Arg('id', () => Int) id: number
    ){
        await connection.manager.delete(Product, { id });
        return true;
    }

    @Mutation(() => Boolean)
    async updateProduct(
        @Arg('id', () => Int) id: number,
        @Arg('fields', () => ProductUpdateInput) fields: ProductUpdateInput
    ){
        await connection.manager.update(Product, { id }, fields);
        return true;
    }

    @Query(() => [Product])
    products() {
        return connection.manager.find(Product);
    }
}