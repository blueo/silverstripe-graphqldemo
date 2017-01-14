<?php
namespace Blueo\GraphQLDemo;

use SilverStripe\Control\Controller as BaseController;
use SilverStripe\Control\Director;
use SilverStripe\Control\HTTPRequest;
use SilverStripe\View\Requirements;

class GraphQLDemoController extends BaseController
{
    public function init()
    {
        parent::init();
        Requirements::javascript(GRAPHQLDEMO_DIR.'/client/dist/graphqldemo.js');
    }

    private static $allowed_actions = array(
        'index'
    );

    public function index(HTTPRequest $request) {
        return $this->render();
    }
}
