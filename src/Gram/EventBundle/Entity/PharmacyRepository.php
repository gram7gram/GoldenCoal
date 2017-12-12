<?php

namespace Gram\EventBundle\Entity;

use Doctrine\ORM\EntityRepository;

class PharmacyRepository extends EntityRepository
{
    private function createFilterQuery($filter)
    {
        $qb = $this->createQueryBuilder('p');
        $e = $qb->expr();

        $qb
            ->addSelect('address')
            ->addSelect('region')
            ->addSelect('type');
        $qb
            ->join('p.address', 'address')
            ->join('address.region', 'region')
            ->leftJoin('p.type', 'type');

        if (isset($filter['region'])) {
            $qb->andWhere($e->eq('region.id', ":region"))
                ->setParameter('region', $filter['region']['id']);
        }

        if (isset($filter['search']) && $filter['search']) {
            $qb->andWhere($e->orX()
                ->add($e->like($e->lower('p.okpo'), ':search'))
                ->add($e->like($e->lower('p.name'), ':search'))
                ->add($e->like($e->lower('p.number'), ':search'))
                ->add($e->like($e->lower('region.name'), ':search'))
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

        $qb->select($e->countDistinct('p.id'));

        return $qb->getQuery()->getSingleScalarResult();
    }

    public function findByFilter($filter, $page, $limit)
    {
        $qb = $this->createFilterQuery($filter);

        if ($page > 0 && $limit > 0) {
            $qb->setMaxResults($limit)
                ->setFirstResult($limit * ($page - 1));
        }

        $qb
            ->orderBy('region.name')
            ->addOrderBy('p.name')
            ->addOrderBy('address.city')
            ->addOrderBy('address.street');

        return $qb->getQuery()->getResult();
    }
}