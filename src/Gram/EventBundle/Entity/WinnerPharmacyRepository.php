<?php

namespace Gram\EventBundle\Entity;

use Doctrine\ORM\EntityRepository;

class WinnerPharmacyRepository extends EntityRepository
{
    private function createFilterQuery($filter)
    {
        $qb = $this->createQueryBuilder('w');
        $e = $qb->expr();

        $qb
            ->addSelect('pharmacy')
            ->addSelect('prize')
            ->addSelect('address')
            ->addSelect('region')
            ->addSelect('type');
        $qb
            ->join('w.pharmacy', 'pharmacy')
            ->join('w.prize', 'prize')
            ->join('pharmacy.address', 'address')
            ->join('address.region', 'region')
            ->leftJoin('pharmacy.type', 'type');

        if (isset($filter['region'])) {
            $selectedId = intval($filter['region']['id']);

            $qb->andWhere($e->eq('region.id', ":region"))
                ->setParameter('region', $selectedId);
        }

        if (isset($filter['search']) && $filter['search']) {
            $qb->andWhere($e->orX()
                ->add($e->like($e->lower('pharmacy.okpo'), ':search'))
                ->add($e->like($e->lower('pharmacy.name'), ':search'))
                ->add($e->like($e->lower('pharmacy.number'), ':search'))
                ->add($e->like($e->lower('address.regionName'), ':search'))
                ->add($e->like($e->lower('address.city'), ':search'))
                ->add($e->like($e->lower('address.street'), ':search'))
            )->setParameter('search', '%' . mb_strtolower($filter['search'], 'utf8') . '%');
        }

        return $qb;
    }

    public function countByFilter($filter)
    {
        $qb = $this->createFilterQuery($filter);
        $e = $qb->expr();

        $qb->select($e->countDistinct('w.id'));

        return $qb->getQuery()->getSingleScalarResult();
    }

    public function findByFilter($filter, $page, $limit)
    {
        $qb = $this->createFilterQuery($filter);

        if ($page > 0 && $limit > 0) {
            $qb->setMaxResults($limit)
                ->setFirstResult($limit * ($page - 1));
        }

        $qb->orderBy('w.id');

        return $qb->getQuery()->getResult();
    }
}