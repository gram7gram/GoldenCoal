<?php

namespace Gram\EventBundle\Entity;

use Doctrine\ORM\EntityRepository;

class ParticipantRepository extends EntityRepository
{
    private function createFilterQuery($filter)
    {
        $qb = $this->createQueryBuilder('p');
        $e = $qb->expr();

        $qb
            ->addSelect('address')
            ->addSelect('pharmacy')
            ->addSelect('pharmacyType')
            ->addSelect('event');
        $qb
            ->join('p.address', 'address')
            ->join('p.pharmacy', 'pharmacy')
            ->join('p.event', 'event')
            ->join('pharmacy.type', 'pharmacyType');

        if (isset($filter['okpo'])) {
            $qb->andWhere($e->eq('pharmacy.okpo', ':okpo'))
                ->setParameter('okpo', $filter['okpo']);
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

        $qb->orderBy('p.id');

        return $qb->getQuery()->getResult();
    }
}