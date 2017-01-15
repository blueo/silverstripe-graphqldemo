<?php
namespace Blueo\GraphQLDemo;

use GraphQL\Type\Definition\Type;
use Blueo\GraphQLDemo\TypeCreator;
use SilverStripe\Assets\Upload;
use SilverStripe\Assets\File;

class UploadTypeCreator extends TypeCreator
{

    protected $scalarType = true;

    public function attributes()
    {
        return [
          'name' => 'Upload',
          'description' => 'A custom Scalar type for uploading files - must be a top-level key. Client side code will detect a FileList type and upload multipart form with this key',
          'serialize' => [__CLASS__, 'serialize'],
          'parseValue' => [__CLASS__, 'parseValue'],
          'parseLiteral' => [__CLASS__, 'parseLiteral'],
        ];
    }

    //serialize: gets invoked when serializing the result to send it back to a client.
    /**
    * @param mixed $value
    * @return mixed|string
    */
    public static function serialize($value)
    {
      return self::parseValue($value);
    }

    // parseValue: gets invoked to parse client input that was passed through variables.
    /**
    * @param mixed $value
    * @return File
    */
    public static function parseValue($value)
    {
      //TODO more comprehensive check for file name validate file etc
      if (is_array($value)) {
        $upload = new Upload();
        $file = new File();
        if ($upload->loadIntoFile($value, $file, 'Uploads')) {
          $file->write();
          return $file;
        }
      }
      return null;
    }

   // parseLiteral: gets invoked to parse client input that was passed inline in the query. - ? will this happen with a file upload.
    /**
   * @param $ast
   * @return null|File
   */
   public static function parseLiteral($ast)
   {
     //TODO just a guess at the moment - returning the same as parseValue
     return self::parseValue($ast->value);
   }

  //  $data['file']array[5]
  // $data['file']['name']"Hamlin Law_Logo.jpg"
  // $data['file']['type']"image/jpeg"
  // $data['file']['tmp_name']"/tmp/phpsvA8Eg"
  // $data['file']['error']0
  // $data['file']['size']23703
}
