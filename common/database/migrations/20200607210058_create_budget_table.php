<?php

use Phinx\Migration\AbstractMigration;

class CreateBudgetTable extends AbstractMigration
{

    public function change()
    {
        $this->table('budgets')
            ->addColumn('amount_budget', 'string')
            ->addColumn('take_date_budget', 'date')
            ->addColumn('account_budget', 'string')
            ->addColumn('projet_budget', 'string',['default' => null])
            ->addColumn('other_projet_budget', 'string',['default' => null])
            ->addColumn('description_budget', 'text')
            ->addColumn('user_id', 'integer')
            ->addColumn('status' , 'integer',['default' => 1])
            ->addTimestamps('created_at',"updated_at")
            ->create();
    }
}
