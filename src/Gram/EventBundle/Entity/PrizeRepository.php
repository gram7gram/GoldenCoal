<?php

namespace Gram\EventBundle\Entity;

use Doctrine\ORM\EntityRepository;

class PrizeRepository extends EntityRepository
{
    private function createFilterQuery($filter)
    {
        $qb = $this->createQueryBuilder('prize');
        $e = $qb->expr();

        $qb
            ->addSelect('event');
        $qb
            ->join('prize.event', 'event');

        if (isset($filter['event'])) {
            $id = intval($filter['event']['id']);

            $qb->andWhere($e->in('event.id', ":event"))
                ->setParameter('event', $id);
        }

        return $qb;
    }

    public function countByFilter($filter)
    {
        $qb = $this->createFilterQuery($filter);
        $e = $qb->expr();

        $qb->select($e->countDistinct('prize.id'));

        return $qb->getQuery()->getSingleScalarResult();
    }

    public function findByFilter($filter, $page, $limit)
    {
        $qb = $this->createFilterQuery($filter);

        if ($page > 0 && $limit > 0) {
            $qb->setMaxResults($limit)
                ->setFirstResult($limit * ($page - 1));
        }

        $qb->orderBy('prize.importance', 'ASC');

        return $qb->getQuery()->getResult();
    }
}