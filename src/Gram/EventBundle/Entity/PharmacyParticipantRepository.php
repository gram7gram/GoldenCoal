<?php

namespace Gram\EventBundle\Entity;

use Doctrine\ORM\EntityRepository;

class PharmacyParticipantRepository extends EntityRepository
{
    private function createFilterQuery($filter)
    {
        $qb = $this->createQueryBuilder('pp');
        $e = $qb->expr();

        $qb
            ->addSelect('event')
            ->addSelect('pharmacy')
            ->addSelect('address')
            ->addSelect('region')
            ->addSelect('type');
        $qb
            ->join('pp.pharmacy', 'pharmacy')
            ->join('pp.event', 'event')
            ->join('pharmacy.address', 'address')
            ->leftJoin('address.region', 'region')
            ->leftJoin('pharmacy.type', 'type');

        if (isset($filter['id'])) {
            $qb->andWhere($e->eq('pp.id', ":id"))
                ->setParameter('id', $filter['id']);
        }

        if (isset($filter['event'])) {
            $qb->andWhere($e->eq('event.id', ":event"))
                ->setParameter('event', $filter['event']);
        }

        if (isset($filter['region'])) {
            $selectedId = intval($filter['region']['id']);
            $ids = [$selectedId];

            switch($selectedId) {
                case Region::KIEV_CITY_ID:
                    $ids[] = Region::KIEV_REGION_ID;
                    break;
                case Region::KIEV_REGION_ID:
                    $ids[] = Region::KIEV_CITY_ID;
                    break;
            }

            $qb->andWhere($e->in('region.id', ":region"))
                ->setParameter('region', $ids);
        }

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

        $qb->select($e->countDistinct('pp.id'));

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
            ->orderBy('event.id')
            ->addOrderBy('region.name')
            ->addOrderBy('pharmacy.name')
            ->addOrderBy('address.city')
            ->addOrderBy('address.street');

        return $qb->getQuery()->getResult();
    }
}