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
            ->addSelect('region')
            ->addSelect('pharmacyType')
            ->addSelect('position')
            ->addSelect('event');
        $qb
            ->join('p.pharmacy', 'pharmacy')
            ->join('p.event', 'event')
            ->leftJoin('p.position', 'position')
            ->leftJoin('p.address', 'address')
            ->leftJoin('address.region', 'region')
            ->leftJoin('pharmacy.type', 'pharmacyType');

        if (isset($filter['search']) && $filter['search']) {
            $qb->andWhere($e->orX()
                ->add($e->like($e->lower('pharmacy.okpo'), ':search'))
                ->add($e->like($e->lower('pharmacy.name'), ':search'))
                ->add($e->like($e->lower('pharmacy.number'), ':search'))
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

        $qb->orderBy('p.id');

        return $qb->getQuery()->getResult();
    }
}