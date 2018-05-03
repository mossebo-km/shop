<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductAttributeOptionsTable extends Migration
{
    protected $tableName;

    public function __construct() {
        $this->tableName = Config::get('migrations.ProductAttributeOptions');
    }

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->down();

        echo "Create ProductAttributeOptions\r\n";

        Schema::create($this->tableName, function (Blueprint $table) {
            $table->engine = "InnoDB";

            $table->integer('product_id')->unsigned()->index();
            $table->foreign('product_id')->references('id')->on(Config::get('migrations.Products'))->onDelete('cascade');

            $table->integer('attribute_id')->unsigned()->index();
            $table->foreign('attribute_id')->references('id')->on(Config::get('migrations.Attributes'))->onDelete('cascade');

            $table->integer('option_id')->unsigned()->index();
            $table->foreign('option_id')->references('id')->on(Config::get('migrations.AttributeOptions'))->onDelete('cascade');

            $table->unique(['product_id', 'option_id']);
            $table->index(['product_id', 'option_id']);
            $table->index(['product_id', 'attribute_id', 'option_id'], 'product_attr_option_index');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists($this->tableName);
    }
}