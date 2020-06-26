<?php

use Phinx\Migration\AbstractMigration;

class CreatePortfolioPortfolioTable extends AbstractMigration
{

    public function change()
    {
        $this->table('portfolio_portfolios')
            ->addColumn('projet_type', 'string')
            ->addColumn('customer', 'integer')
            ->addColumn('duration', 'string')
            ->addColumn('technologies', 'text')
            ->addColumn('budget', 'string')
            ->addColumn('picture', 'string')
            ->addColumn('status' , 'integer',['default' => 1])
            ->addTimestamps('created_at',"updated_at")
            ->create();
    }
}
