<?php

namespace Gram\EventBundle\Entity;

use Doctrine\ORM\EntityRepository;

class RegionRepository extends EntityRepository
{
    private function createFilterQuery($filter)
    {
        $qb = $this->createQueryBuilder('region');
        $e = $qb->expr();

        if (isset($filter['search']) && $filter['search']) {
            $qb->andWhere($e->like($e->upper('region.name'), ':search'))
                ->setParameter('search', '%' . mb_strtoupper($filter['search'], 'utf8') . '%');
        }

        return $qb;
    }

    public function countByFilter($filter)
    {
        $qb = $this->createFilterQuery($filter);
        $e = $qb->expr();

        $qb->select($e->countDistinct('region.id'));

        return $qb->getQuery()->getSingleScalarResult();
    }

    public function findByFilter($filter, $page, $limit)
    {
        $qb = $this->createFilterQuery($filter);

        if ($page > 0 && $limit > 0) {
            $qb->setMaxResults($limit)
                ->setFirstResult($limit * ($page - 1));
        }

        $qb->orderBy('region.type')
            ->addOrderBy('region.name');

        return $qb->getQuery()->getResult();
    }
}