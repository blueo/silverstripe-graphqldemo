<?php
namespace Blueo\GraphQLDemo;

use GraphQL\Type\Definition\Type;
use SilverStripe\GraphQL\TypeCreator;
use SilverStripe\GraphQL\Pagination\Connection;

class FileTypeCreator extends TypeCreator
{
    public function attributes()
    {
        return [
            'name' => 'file'
        ];
    }

    public function fields()
    {
        return [
            'ID' => ['type' => Type::nonNull(Type::id())],
            'FileName' => ['type' => Type::string()],
            'Url' => ['type' => Type::string()],
        ];
    }
}
