<?php

namespace Blueo\GraphQLDemo;

use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;
use SilverStripe\GraphQL\OperationResolver;
use SilverStripe\GraphQL\QueryCreator;
use SilverStripe\Assets\File;

class FileQueryCreator extends QueryCreator implements OperationResolver
{
  public function attributes()
    {
        return [
            'name' => 'readFile'
        ];
    }

    public function args()
    {
      return [
        'ID' => ['type' => Type::nonNull(Type::id())]
      ];
    }

    public function type()
    {
        // Return a "thunk" to lazy load types
        return function () {
            return $this->manager->getType('file');
        };
    }

    public function resolve($object, array $args, $context, ResolveInfo $info)
    {
      return File::get()->byID($args['ID']);
    }
}
