<?php

namespace Gram\EventBundle\Entity;

use Doctrine\ORM\EntityRepository;

class PositionRepository extends EntityRepository
{
    private function createFilterQuery($filter)
    {
        $qb = $this->createQueryBuilder('position');

        return $qb;
    }

    public function countByFilter($filter)
    {
        $qb = $this->createFilterQuery($filter);
        $e = $qb->expr();

        $qb->select($e->countDistinct('position.id'));

        return $qb->getQuery()->getSingleScalarResult();
    }

    public function findByFilter($filter, $page, $limit)
    {
        $qb = $this->createFilterQuery($filter);

        if ($page > 0 && $limit > 0) {
            $qb->setMaxResults($limit)
                ->setFirstResult($limit * ($page - 1));
        }

        $qb->orderBy('position.id');

        return $qb->getQuery()->getResult();
    }
}