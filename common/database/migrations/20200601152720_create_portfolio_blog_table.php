<?php

use Phinx\Migration\AbstractMigration;

class CreatePortfolioBlogTable extends AbstractMigration
{
    /**
     * Change Method.
     *
     * Write your reversible migrations using this method.
     *
     * More information on writing migrations is available here:
     * http://docs.phinx.org/en/latest/migrations.html#the-abstractmigration-class
     *
     * The following commands can be used in this method and Phinx will
     * automatically reverse them when rolling back:
     *
     *    createTable
     *    renameTable
     *    addColumn
     *    addCustomColumn
     *    renameColumn
     *    addIndex
     *    addForeignKey
     *
     * Any other destructive changes will result in an error when trying to
     * rollback the migration.
     *
     * Remember to call "create()" or "update()" and NOT "save()" when working
     * with the Table class.
     */
    public function change()
    {
        $this->table('portfolio_blogs')
            ->addColumn('title', 'string')
            ->addColumn('author', 'string')
            ->addColumn('tag', 'string')
            ->addColumn('content', 'text')
            ->addColumn('slug', 'string')
            ->addColumn('picture', 'string')
            ->addColumn('status' , 'integer',['default' => 1])
            ->addTimestamps('created_at',"updated_at")
            ->create();
    }
}
