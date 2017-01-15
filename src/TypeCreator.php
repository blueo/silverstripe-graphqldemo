<?php
namespace Blueo\GraphQLDemo;

use SilverStripe\GraphQL\TypeCreator as BaseTypeCreator;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\CustomScalarType;

class TypeCreator extends BaseTypeCreator
{

  /**
   * @var bool Determines if the object should be cast as an {@link ScalarType}
   */
  protected $scalarType = false;

  /**
   * @return bool
   */
  public function isScalarType()
  {
      return $this->scalarType;
  }

  /**
  * override to add scalar types
  */
  public function toType()
  {
      if ($this->isInputObject()) {
          return new InputObjectType($this->toArray());
      }

      if ($this->isScalarType()) {
          return new CustomScalarType($this->toArray());
      }

      return new ObjectType($this->toArray());
  }
}
