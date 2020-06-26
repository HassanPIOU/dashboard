<?php


use Phinx\Seed\AbstractSeed;

class PortfolioContactSeeder extends AbstractSeed
{

    public function run()
    {
        $data = [];
        $faker = \Faker\Factory::create('fr_FR');
        for ($i = 0; $i  < 29 ; ++$i){
            $date =  $faker->unixTime('now');
            $data[] = [
                'fullname'  =>  $faker->name,
                'email' => $faker->email,
                'sujet' => $faker->text(30),
                'message' => $faker->text,
                'user_id' => 1,
                'created_at' => date('Y-m-d H:i:s', $date),
                'updated_at'  => date('Y-m-d H:i:s' , $date)

            ];
        }

        $this->table('portfolio_contacts')
            ->insert($data)
            ->save();
    }
}
